package malka.plus.maps;

import org.springframework.stereotype.Component;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;

import malka.plus.model.User;

@Component
public class PayloadToUserMapper extends MapBase <Payload, User>
{
	@Override
	public void apply(Payload src, User target) 
	{
		target.setEmail(src.getEmail());
		target.setId(src.getSubject());
		target.setName((String) src.get("name"));
		target.setPictureUrl((String) src.get("picture"));
		target.setLocale((String) src.get("locale"));
		target.setFamilyName((String) src.get("family_name"));
		target.setGivenName((String) src.get("given_name"));
	}
}
