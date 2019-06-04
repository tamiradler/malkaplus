package malka.plus.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import malka.plus.model.DishItem;
import malka.plus.model.DishItemSubjectCollection;
import malka.plus.repository.DishItemSubjectCollectionRepository;
import malka.plus.view.Menu;

@Service
public class DishItemSubjectCollectionService 
{
	@Autowired
	private DishItemSubjectCollectionRepository dishItemSubjectCollectionRepository;
	
	public void saveSubjects(Menu menu)
	{
		Set <String> subjects = new HashSet<>();
		List<malka.plus.model.Dish> dishesModels = menu.getDishs();
		if(dishesModels != null)
		{
			dishesModels.forEach(dish -> {
				List<DishItem> dishItems = dish.getDishItems();
				dishItems.forEach(dishItem -> subjects.add(dishItem.getSubject()));
			});
		}
		DishItemSubjectCollection dishItemSubjectCollection = dishItemSubjectCollectionRepository.findById("1").orElse(new DishItemSubjectCollection());
		dishItemSubjectCollection.addAllSubjects(subjects);
		dishItemSubjectCollectionRepository.save(dishItemSubjectCollection);
	}
}
