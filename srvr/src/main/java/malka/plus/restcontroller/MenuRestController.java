package malka.plus.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import malka.plus.controller.MenuController;
import malka.plus.view.Menu;

@RestController
public class MenuRestController 
{
	@Autowired
	private MenuController menuController;
	
	@CrossOrigin
	@GetMapping("/menus")
	public List <Menu> getMenus()
	{
		return menuController.getMenus();
	}
	
	@CrossOrigin
	@GetMapping("/menus/{id}")
	public Menu getMenus(@PathVariable String id)
	{
		return menuController.getMenus(id);
	}
	
	@CrossOrigin
	@PostMapping("/menus")
	public Menu addMenu(@RequestBody Menu menu, @RequestHeader("authTokenId") String authTokenId)
	{
		return menuController.addMenu(menu);
	}
}
