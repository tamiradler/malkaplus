package malka.plus.restcontroller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import malka.plus.controller.DishItemSubjectCollectionController;

@RestController
public class DishItemSubjectCollectionRestController 
{
	@Autowired
	private DishItemSubjectCollectionController dishItemSubjectCollectionController;
	
	@CrossOrigin
	@GetMapping("/dishItemSubjects")
	public Set <String> getDishItemSubjects()
	{
		return dishItemSubjectCollectionController.getDishItemSubjects();
	}
}
