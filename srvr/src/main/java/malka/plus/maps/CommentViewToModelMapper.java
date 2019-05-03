package malka.plus.maps;

import org.springframework.stereotype.Component;

import malka.plus.view.Comment;

@Component
public class CommentViewToModelMapper extends MapBase<Comment, malka.plus.model.Comment>
{
	@Override
	public void apply(Comment src, malka.plus.model.Comment target) 
	{
		target.setDateId(src.getDateId());
		super.apply(src, target);
	}
}
