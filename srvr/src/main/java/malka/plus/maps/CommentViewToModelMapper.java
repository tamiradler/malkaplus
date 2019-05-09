package malka.plus.maps;

import org.modelmapper.PropertyMap;
import org.springframework.stereotype.Component;

import malka.plus.view.Comment;

@Component
public class CommentViewToModelMapper extends MapBase<Comment, malka.plus.model.Comment>
{
	CommentViewToModelMapper()
	{
		PropertyMap<Comment, malka.plus.model.Comment> propertyMap = new PropertyMap<Comment, malka.plus.model.Comment> (){
	        protected void configure() {
	            map(source.getUserId()).setUserId(source.getUserId());
	        }
	    };
		
		getModelMapper().addMappings(propertyMap);
	}
	
	@Override
	public void apply(Comment src, malka.plus.model.Comment target) 
	{
		target.setDateId(src.getDateId());
		super.apply(src, target);
	}
}
