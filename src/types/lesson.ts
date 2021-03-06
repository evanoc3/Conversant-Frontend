export interface Lesson {
	id: number,
	title: string,
	topic: string,
	topicLabel: string,
	firstPart: number,
	nextLesson:  number
}

export enum LessonPartResponseType {
	Proceed = "proceed",
	YesNo = "yesNo",
	EndOfLesson = "endOfLesson",
	MultipleChoice = "multipleChoice"
}