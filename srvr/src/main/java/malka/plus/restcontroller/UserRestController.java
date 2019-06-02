package malka.plus.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
	@PostMapping("/users")
	public void addUser(@RequestHeader("authTokenId") String authTokenId)
	{
		userController.addUser(authTokenId);
	}
	
	@CrossOrigin
	@GetMapping("/users")
	public User getUser(@RequestHeader("authTokenId") String authTokenId)
	{
		return userController.getUser(authTokenId);
	}
}
