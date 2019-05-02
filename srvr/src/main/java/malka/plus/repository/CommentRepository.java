package malka.plus.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import malka.plus.model.Comment;

public interface CommentRepository extends MongoRepository<Comment, String>
{

}
