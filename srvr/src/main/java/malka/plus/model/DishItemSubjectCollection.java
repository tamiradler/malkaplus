package malka.plus.model;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "dishItemSubjectCollection")
public class DishItemSubjectCollection 
{
	private Set <String> subjects = new HashSet<>();

	private String id = "1";
	
	public String getId() 
	{
		return id;
	}

	public void setId(String id) 
	{
		this.id = id;
	}

	public Set<String> getSubjects() 
	{
		return subjects;
	}

	public void setSubjects(Set<String> subjects) 
	{
		this.subjects = subjects;
	}
	
	public void addAllSubjects(Collection <String> subjects)
	{
		this.subjects.addAll(subjects);
	}
	
	public void addSubject(String subject)
	{
		this.subjects.add(subject);
	}
}
