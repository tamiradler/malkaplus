package malka.plus.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user")
public class User 
{
	@Id
	private String id;
	
	private String email;
	
	private String name;
	
	private String pictureUrl;
	
	private String locale;
	
	private String familyName;
	
	private String givenName;

	private List <String> skills = new ArrayList<>();

	public String getId() 
	{
		return id;
	}

	public void setId(String id) 
	{
		this.id = id;
	}
	
	public String getEmail() 
	{
		return email;
	}

	public void setEmail(String email) 
	{
		this.email = email;
	}

	public List<String> getSkills() 
	{
		return skills;
	}

	public void setSkills(List<String> skills) 
	{
		this.skills = skills;
	}
	
	public void addSkill(String skill)
	{
		skills.add(skill);
	}
	
	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public String getPictureUrl()
	{
		return pictureUrl;
	}

	public void setPictureUrl(String pictureUrl)
	{
		this.pictureUrl = pictureUrl;
	}

	public String getLocale()
	{
		return locale;
	}

	public void setLocale(String locale)
	{
		this.locale = locale;
	}

	public String getFamilyName()
	{
		return familyName;
	}

	public void setFamilyName(String familyName)
	{
		this.familyName = familyName;
	}

	public String getGivenName()
	{
		return givenName;
	}

	public void setGivenName(String givenName) 
	{
		this.givenName = givenName;
	}
}
