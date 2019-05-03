package malka.plus.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import malka.plus.controller.CommentController;
import malka.plus.model.Comment;

@RestController
public class CommentRestController 
{
	@Autowired
	private CommentController commentController;
	
	@CrossOrigin
	@GetMapping("/comments")
	public List <Comment> getComments()
	{
		return commentController.getComments();
	}
	
	@CrossOrigin
	@GetMapping("/comments/dateId/{dateId}")
	public List <Comment> getCommentsByDateId(@PathVariable String dateId)
	{
		return commentController.getCommentsByDateId(dateId);
	}
}
