package malka.plus.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "comment")
public class Comment 
{
	@Id
    private String id;
	
	private String subject;

	private String content;
	
	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getId() 
	{
		return id;
	}

	public void setId(String id) 
	{
		this.id = id;
	}

	public String getSubject() 
	{
		return subject;
	}

	public void setSubject(String subject) 
	{
		this.subject = subject;
	}
}
