package malka.plus.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import malka.plus.authentication.Authentication;
import malka.plus.constants.UserSkillsConstants;
import malka.plus.maps.MenuModelToViewMapper;
import malka.plus.maps.MenuViewToModelMapper;
import malka.plus.model.DishItem;
import malka.plus.repository.MenuRepository;
import malka.plus.service.DishItemSubjectCollectionService;
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
	
	@Autowired
	private DishItemSubjectCollectionService dishItemSubjectCollectionService;
	
	public List <Menu> getMenus() 
	{
		List <Menu> menus = new ArrayList<>();
		menuModelToViewMapper.apply(menuRepository.findAll(), menus, Menu.class);
		return menus;
	}

	public Menu addMenu(Menu menu, String authTokenId) 
	{
		authentication.authenticatAndGetUser(authTokenId, UserSkillsConstants.ADMIN, UserSkillsConstants.MENU_EDITOR);
		
		dishItemSubjectCollectionService.saveSubjects(menu);
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
	
	public List<String> getDistinctSubjects()
	{
		Set <String> subjects = new HashSet<>();
		
		List <malka.plus.model.Menu> menusModels = menuRepository.findAll();
		menusModels.forEach(menu -> {
			List<malka.plus.model.Dish> dishesModels = menu.getDishs();
			if(dishesModels != null)
			{
				dishesModels.forEach(dish->subjects.add(dish.getSubject()));
			}
		});
		
		return new ArrayList<>(subjects);
	}
	
	public List<String> getDistinctDishes()
	{
		List <malka.plus.model.Menu> menusModels = menuRepository.findAll();
		Set <String> dishes = new HashSet<>();
		
		menusModels.forEach(menu ->
		{
			List<malka.plus.model.Dish> dishesModels = menu.getDishs();
			if(dishesModels != null)
			{
				dishesModels.forEach(dish -> {
					List<DishItem> dishItems = dish.getDishItems();
					dishItems.forEach(dishItem -> dishes.add(dishItem.getSubject()));
				});
			}
		});
		return new ArrayList<>(dishes);
	}
}
