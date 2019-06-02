package malka.plus.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import malka.plus.authentication.Authentication;
import malka.plus.maps.UserModelToViewMapper;
import malka.plus.view.User;


@Controller
public class UserController 
{

	@Autowired
	private Authentication authentication;

	@Autowired
	private UserModelToViewMapper userModelToViewMapper;
	
	public void addUser(String authTokenId) 
	{
	}

	public User getUser(String authTokenId) 
	{
		malka.plus.model.User userModel = authentication.authenticatAndGetUser(authTokenId);
		User user = new User();
		userModelToViewMapper.apply(userModel, user);
		return user;
	}

}
