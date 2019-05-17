package malka.plus.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import malka.plus.authentication.Authentication;
import malka.plus.maps.MenuModelToViewMapper;
import malka.plus.maps.MenuViewToModelMapper;
import malka.plus.repository.MenuRepository;
import malka.plus.view.Menu;

@Controller
public class MenuController 
{
	@Autowired
	private MenuRepository menuRepository;
	
	@Autowired
	private MenuModelToViewMapper menuModelToViewMapper;
	
	@Autowired
	private MenuViewToModelMapper menuViewToModelMapper;
	
	@Autowired
	private Authentication authentication;
	
	public List <Menu> getMenus() 
	{
		List <Menu> menus = new ArrayList<>();
		menuModelToViewMapper.apply(menuRepository.findAll(), menus, Menu.class);
		return menus;
	}

	public Menu addMenu(Menu menu, String authTokenId) 
	{
		authentication.authenticatAndGetUser(authTokenId, "admin", "menuEditor");
		
		malka.plus.model.Menu menuModel = new malka.plus.model.Menu();
		menuViewToModelMapper.apply(menu, menuModel);
		menuRepository.save(menuModel);
		return menu;
	}

	public Menu getMenus(String id) 
	{
		malka.plus.model.Menu menuModel = menuRepository.findById(id).orElse(new malka.plus.model.Menu());
		Menu menu = new Menu();
		menuModelToViewMapper.apply(menuModel, menu);
		return menu;
	}
}
