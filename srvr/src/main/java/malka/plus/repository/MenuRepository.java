package malka.plus.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import malka.plus.model.Menu;

public interface MenuRepository extends MongoRepository<Menu, String>
{

}
