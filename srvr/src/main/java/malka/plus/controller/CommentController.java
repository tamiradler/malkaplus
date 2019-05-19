package malka.plus.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import malka.plus.view.Comment;
import malka.plus.repository.CommentRepository;
import malka.plus.repository.UserRepository;
import malka.plus.authentication.Authentication;
import malka.plus.maps.CommentModelToViewMapper;
import malka.plus.maps.CommentViewToModelMapper;
import malka.plus.maps.UserModelToViewMapper;
import malka.plus.model.User;

@Controller
public class CommentController
{
	@Autowired
	private CommentRepository commentRepository;
	
	@Autowired
	private CommentModelToViewMapper commentModelToViewMapper;
	
	@Autowired
	private CommentViewToModelMapper commentViewToModelMapper;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserModelToViewMapper userModelToViewMapper;
	
	@Autowired
	private Authentication authentication;
	
	public List <Comment> getComments()
	{
		List <Comment> comments = new ArrayList<>();
		commentModelToViewMapper.apply(commentRepository.findAll(), comments, Comment.class);
		attacheUsers(comments);
		return 	comments;
	}

	private void attacheUsers(List<Comment> comments) 
	{
		List <String> userIds = new ArrayList<>();
		comments.forEach(comment->userIds.add(comment.getUserId()));
		List <User> users = userRepository.findUserByIdIn(userIds);
		comments.forEach(comment->{
			users.forEach(user-> {
				if (user.getId().equals(comment.getUserId()))
				{
					malka.plus.view.User userView = new malka.plus.view.User();
					userModelToViewMapper.apply(user, userView);
					comment.setUser(userView);
				}
			});
		});
	}

	public List<Comment> getCommentsByDateId(String dateId) 
	{
		List <Comment> comments = new ArrayList<>();
		commentModelToViewMapper.apply(commentRepository.findByDateId(dateId), comments, Comment.class);
		attacheUsers(comments);
		return 	comments;
	}

	public Comment addComment(Comment commentView, String authTokenId) 
	{
		User user = authentication.authenticatAndGetUser(authTokenId);
		
		malka.plus.model.Comment commentModel = new malka.plus.model.Comment();
		commentViewToModelMapper.apply(commentView, commentModel);
		String id = UUID.randomUUID().toString();
		commentModel.setId(id);
		commentModel.setUserId(user.getId());
		commentRepository.save(commentModel);
		return commentView;
	}
}
