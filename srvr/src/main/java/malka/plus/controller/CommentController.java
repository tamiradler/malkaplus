package malka.plus.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import malka.plus.view.Comment;
import malka.plus.repository.CommentRepository;
import malka.plus.maps.CommentModelToViewMapper;
import malka.plus.maps.CommentViewToModelMapper;

@Controller
public class CommentController
{
	@Autowired
	private CommentRepository commentRepository;
	
	@Autowired
	private CommentModelToViewMapper commentModelToViewMapper;
	
	@Autowired
	private CommentViewToModelMapper commentViewToModelMapper;
	
	public List <Comment> getComments()
	{
		List <Comment> comments = new ArrayList<>();
		commentModelToViewMapper.apply(commentRepository.findAll(), comments, Comment.class);
		return 	comments;
	}

	public List<Comment> getCommentsByDateId(String dateId) 
	{
		List <Comment> comments = new ArrayList<>();
		commentModelToViewMapper.apply(commentRepository.findByDateId(dateId), comments, Comment.class);
		return 	comments;
	}

	public Comment addComment(Comment comment) 
	{
		malka.plus.model.Comment commentModel = new malka.plus.model.Comment();
		commentViewToModelMapper.apply(comment, commentModel);
		String id = UUID.randomUUID().toString();
		commentModel.setId(id);
		commentRepository.save(commentModel);
		return comment;
	}
}
