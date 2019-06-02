package malka.plus.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import malka.plus.authentication.Authentication;
import malka.plus.constants.UserSkillsConstants;
import malka.plus.maps.UserModelToViewMapper;
import malka.plus.repository.UserRepository;
import malka.plus.view.User;


@Controller
public class UserController 
{

	@Autowired
	private Authentication authentication;

	@Autowired 
	private UserRepository userRepository;
	
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

	public User getUser(String authTokenId, String email) 
	{
		authentication.authenticatAndGetUser(authTokenId, UserSkillsConstants.ADMIN);
		malka.plus.model.User userModel = userRepository.findUserByEmail(email);
		User user = new User();
		userModelToViewMapper.apply(userModel, user);
		return user;
	}

	public User addSkillToUser(String authTokenId, String userId, String newSkill)
	{
		authentication.authenticatAndGetUser(authTokenId, UserSkillsConstants.ADMIN);
		List<malka.plus.model.User> userModels = userRepository.findUserByIdIn(Arrays.asList(userId));
		for (malka.plus.model.User userModel : userModels)
		{
			userModel.addSkill(newSkill);
			userRepository.save(userModel);
			User user = new User();
			userModelToViewMapper.apply(userModel, user);
			return user;
		}
		return null;
	}

	
	public List<String> getSkills() 
	{
		return Arrays.asList(UserSkillsConstants.ADMIN, UserSkillsConstants.MENU_EDITOR);
	}

}
