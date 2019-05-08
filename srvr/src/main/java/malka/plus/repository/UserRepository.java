package malka.plus.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import malka.plus.model.User;

public interface UserRepository extends MongoRepository<User, String>
{
	
}
