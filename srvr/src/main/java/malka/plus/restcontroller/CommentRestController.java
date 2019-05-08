package malka.plus.restcontroller;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import malka.plus.controller.CommentController;
import malka.plus.view.Comment;

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
	
	@CrossOrigin
	@PostMapping("/comments")
	public Comment addComment(@RequestBody Comment comment, @RequestHeader("authTokenId") String authTokenId) throws GeneralSecurityException, IOException
	{
		return commentController.addComment(comment, authTokenId);
	}
}
