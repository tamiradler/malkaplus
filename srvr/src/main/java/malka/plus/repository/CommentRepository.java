package malka.plus.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import malka.plus.model.Comment;

public interface CommentRepository extends MongoRepository<Comment, String>
{
	List <Comment> findByDateId(String dateId);
}
