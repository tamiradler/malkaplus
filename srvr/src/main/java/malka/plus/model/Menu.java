package malka.plus.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "menu")
public class Menu 
{
	@Id
	private String dateId;
	
	private List <Dish> courses;

	public String getDateId() {
		return dateId;
	}

	public void setDateId(String dateId) {
		this.dateId = dateId;
	}

	public List<Dish> getCourses() {
		return courses;
	}

	public void setCourses(List<Dish> courses) {
		this.courses = courses;
	}
}
