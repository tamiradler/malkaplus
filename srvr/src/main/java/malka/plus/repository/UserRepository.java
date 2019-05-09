package malka.plus.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import malka.plus.model.User;

public interface UserRepository extends MongoRepository<User, String>
{
	List <User> findUserByIdIn(List<String> id);
}
