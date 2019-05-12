package malka.plus.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import malka.plus.model.Dish;

public interface DishRepository extends MongoRepository<Dish, String>
{
	
}
