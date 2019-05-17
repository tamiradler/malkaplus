package malka.plus.authentication;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;

import malka.plus.exceptions.AuthenticationException;
import malka.plus.maps.PayloadToUserMapper;
import malka.plus.model.User;
import malka.plus.repository.UserRepository;

@Component
public class GoogleAuthentication implements Authentication
{
	@Value("${malka.plus.admin.user}")
	private String adminUserId;
	
	@Autowired
	private PayloadToUserMapper payloadToUserMapper; 
	
	
	@Autowired
	private UserRepository userRepository;
	
	
	@Override
	public User authenticatAndGetUser(String authTokenId, String ... requiredSkills) 
	{
		Payload payload = getPayloadFromGoogle(authTokenId);
		User user = userRepository.findById(payload.getSubject()).orElse(new User());
		
		payloadToUserMapper.apply(payload, user);
		addAdminSkillToUser(user);
		validateSkills(user, requiredSkills);
		userRepository.save(user);
		
		return user;
	}
	
	
	private void validateSkills(User user, String[] requiredSkills) 
	{
		if (requiredSkills == null || requiredSkills.length == 0)
		{
			return;
		}
		
		for (String skill : requiredSkills) 
		{
			if (user.getSkills().contains(skill))
			{
				return;
			}
		}
		throw new AuthenticationException("Authentication failed - the user dont have any skill from the list - " + requiredSkills);
	}


	private void addAdminSkillToUser(User user)
	{
		if (user.getId().equals(adminUserId))
		{
			user.addSkill("admin");
		}
	}
	
	
	private Payload getPayloadFromGoogle(String authTokenId)
	{
		try
		{
			HttpTransport transport = GoogleNetHttpTransport.newTrustedTransport();
			JsonFactory jsonFactory = new JacksonFactory();
			GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
					.setAudience(Collections.singletonList("795668388432-7lor70m45089bapr51bng6t14003g4hc.apps.googleusercontent.com")).build();
			
			GoogleIdToken idToken = verifier.verify(authTokenId);
			Payload payload = idToken.getPayload();
			
			return payload;
		}
		catch (Exception e)
		{
			throw new AuthenticationException("Authentication failed", e);
		}
	}

}
