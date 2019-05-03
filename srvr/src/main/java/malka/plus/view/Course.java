package malka.plus.view;

import java.util.List;

import malka.plus.model.CourseItem;

public class Course 
{
	private String subject;
	
	List <CourseItem> courseItems;

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public List<CourseItem> getCourseItems() {
		return courseItems;
	}

	public void setCourseItems(List<CourseItem> courseItems) {
		this.courseItems = courseItems;
	}
}
