package malka.plus.authentication;

import malka.plus.model.User;

public interface Authentication 
{
	User authenticatAndGetUser(String authTokenId);
}
