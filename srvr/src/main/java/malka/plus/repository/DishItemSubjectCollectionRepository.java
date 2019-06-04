package malka.plus.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import malka.plus.model.DishItemSubjectCollection;

public interface DishItemSubjectCollectionRepository extends MongoRepository <DishItemSubjectCollection, String>
{

}
