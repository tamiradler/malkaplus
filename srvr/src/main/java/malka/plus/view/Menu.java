package malka.plus.view;

import java.util.List;

import malka.plus.model.Course;

public class Menu 
{
	private String dateId;
	
	private List <Course> courses;

	public String getDateId() {
		return dateId;
	}

	public void setDateId(String dateId) {
		this.dateId = dateId;
	}

	public List<Course> getCourses() {
		return courses;
	}

	public void setCourses(List<Course> courses) {
		this.courses = courses;
	}
}
