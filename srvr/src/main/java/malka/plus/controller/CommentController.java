package malka.plus.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import malka.plus.model.Comment;
import malka.plus.repository.CommentRepository;

@Controller
public class CommentController
{
	@Autowired
	private CommentRepository commentRepository;
	
	public List <Comment> getComments()
	{
		return 	commentRepository.findAll();
	}
}
