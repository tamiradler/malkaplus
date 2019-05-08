package malka.plus.authentication;

import java.util.Collections;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
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

	@Autowired
	private PayloadToUserMapper payloadToUserMapper; 
	
	
	@Autowired
	private UserRepository userRepository;
	
	
	@Override
	public User authenticatAndGetUser(String authTokenId) 
	{
		User googleUser = getUserFromGoogle(authTokenId);
		User repositoryUser = userRepository.findById(googleUser.getId()).orElse(new User());
		repositoryUser.setEmail(googleUser.getEmail());
		repositoryUser.setId(googleUser.getId());
		ModelMapper mapper = new ModelMapper();
		mapper.map(googleUser, repositoryUser);
		userRepository.save(repositoryUser);
		
		return repositoryUser;
	}
	
	
	private User getUserFromGoogle(String authTokenId)
	{
		try
		{
			HttpTransport transport = GoogleNetHttpTransport.newTrustedTransport();
			JsonFactory jsonFactory = new JacksonFactory();
			GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
					.setAudience(Collections.singletonList("795668388432-7lor70m45089bapr51bng6t14003g4hc.apps.googleusercontent.com")).build();
			
			GoogleIdToken idToken = verifier.verify(authTokenId);
			Payload payload = idToken.getPayload();
			User user = new User();
			payloadToUserMapper.apply(payload, user);
			
			return user;
		}
		catch (Exception e)
		{
			throw new AuthenticationException("Authentication failed", e);
		}
	}

}
