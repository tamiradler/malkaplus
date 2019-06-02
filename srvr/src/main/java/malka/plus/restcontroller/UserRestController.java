package malka.plus.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import malka.plus.controller.UserController;
import malka.plus.view.User;

@RestController
public class UserRestController 
{
	@Autowired
	private UserController userController;
	
	
	@CrossOrigin
	@PostMapping("/users/{userId}/newSkill/{newSkill}")
	public User addSkillToUser(@RequestHeader("authTokenId") String authTokenId,
			@PathVariable("userId") String userId,
			@PathVariable("newSkill") String newSkill)
	{
		return userController.addSkillToUser(authTokenId, userId, newSkill);
	}
	
	
	@CrossOrigin
	@GetMapping("/users/email/{email}")
	public User getUser(@RequestHeader("authTokenId") String authTokenId, @PathVariable("email") String email)
	{
		return userController.getUser(authTokenId, email);
	}
	
	
	@CrossOrigin
	@GetMapping("/users")
	public User getUser(@RequestHeader("authTokenId") String authTokenId)
	{
		return userController.getUser(authTokenId);
	}
	
	
	@CrossOrigin
	@GetMapping("/skills")
	public List<String> getSkills()
	{
		return userController.getSkills();
	}
}
