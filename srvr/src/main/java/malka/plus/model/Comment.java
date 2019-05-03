package malka.plus.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "comment")
public class Comment 
{
	@Id
    private String id;
	
	private String subject;

	private String content;
	
	private Date date;
	
	private String userId;
	
	private String dateId;
	
	public Date getDate() 
	{
		return date;
	}

	public void setDate(Date date) 
	{
		this.date = date;
	}

	public String getUserId() 
	{
		return userId;
	}

	public void setUserId(String userId) 
	{
		this.userId = userId;
	}

	public String getDateId() 
	{
		return dateId;
	}

	public void setDateId(String dateId) 
	{
		this.dateId = dateId;
	}

	public String getContent() 
	{
		return content;
	}

	public void setContent(String content) 
	{
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
