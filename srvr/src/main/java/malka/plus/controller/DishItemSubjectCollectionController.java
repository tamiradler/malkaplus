package malka.plus.controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import malka.plus.model.DishItemSubjectCollection;
import malka.plus.repository.DishItemSubjectCollectionRepository;

@Controller
public class DishItemSubjectCollectionController 
{
	@Autowired
	private DishItemSubjectCollectionRepository dishItemSubjectCollectionRepository;
	
	public Set<String> getDishItemSubjects() 
	{
		DishItemSubjectCollection dishItemSubjectCollection = dishItemSubjectCollectionRepository.findById("1").orElse(new DishItemSubjectCollection());
		return dishItemSubjectCollection.getSubjects();
	}
}
