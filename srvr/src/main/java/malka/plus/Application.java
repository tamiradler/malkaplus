package malka.plus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import malka.plus.model.Comment;
import malka.plus.repository.CommentRepository;

@SpringBootApplication
@RestController
public class Application {

	@Autowired
	private CommentRepository commentRepository;
	
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
	
	@GetMapping("/")
	public String hellow()
	{
		String id = Long.toString(commentRepository.count());
		Comment comment = new Comment();
		comment.setId(id);
		comment.setSubject("bla bla " + id);
		commentRepository.save(comment);
		return id;
	}

}
