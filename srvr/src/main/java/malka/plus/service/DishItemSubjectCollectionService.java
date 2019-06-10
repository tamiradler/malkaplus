package malka.plus.service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

		Stream.of(menu)
			.filter(m -> m.getDishs() != null)
			.flatMap(m -> m.getDishs().stream())
			.filter(dish -> dish.getDishItems() != null)
			.flatMap(dish -> dish.getDishItems().stream())
			.map(dishItem -> dishItem.getSubject())
			.forEach(subjects::add);
		
		DishItemSubjectCollection dishItemSubjectCollection = dishItemSubjectCollectionRepository.findById("1").orElse(new DishItemSubjectCollection());
		dishItemSubjectCollection.addAllSubjects(subjects);
		dishItemSubjectCollectionRepository.save(dishItemSubjectCollection);
	}
}
