import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "./[lessonId].module.scss";
import { Background } from "@components/index";
import { ConversationArea, SendMessageForm, Sidebar, TitleBar } from "@components/LessonPage/index";
import { Sender } from "@customTypes/messages";
import { LessonPartResponseType } from "@customTypes/lesson";  

import type { FunctionComponent, PropsWithChildren } from "react";
import type { NextRouter } from "next/router";
import type { Lesson } from "@customTypes/lesson";
import type { Response as LessonApiRouteResponse } from "@pages/api/lesson/[lessonId]";
import type { Response as PartApiRouteResponse } from "@pages/api/lesson/[lessonId]/part/[partNumber]";
import type { MessageList } from "@customTypes/messages";


type Props = PropsWithChildren<{
	router: NextRouter,
}>


const LessonPage: FunctionComponent<Props> = (props) => {
	// State & Other Hooks
	const [lessonId, setLessonId] = useState<number | undefined>(undefined);
	const [lesson, setLesson] = useState<Lesson | undefined>();
	const [currentPart] = useState(0);
	const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
	const [messages, setMessages] = useState<MessageList>([]);
	const router = useRouter();

	// Methods
	const toggleSidebarOpen = () => setSidebarIsOpen(!sidebarIsOpen);

	const sendMessageHandler = (message: string) => {
		if(lesson !== undefined) {
			setMessages([... messages, {
				timestamp: new Date(),
				sender: Sender.USER,
				content: message
			}]);
		}
	};


	async function addMessage(msg: string): Promise<void> {
		// Set according to the average characters per minute typed by a fast adult (see http://typefastnow.com/average-typing-speed)
		const typingTime = msg.length * 20;

		setMessages([... messages, "typing"]);

		await new Promise(resolve => setTimeout(resolve, typingTime));

		setMessages([...messages.slice(0, -1), {
			timestamp: new Date(),
			sender: Sender.SYSTEM,
			content: msg
		}]);

		return;
	}

	// Fetch lesson metadata when router is ready and has parsed lessonId
	useEffect(() => {
		if(router.isReady) {
			try {
				// when the router is ready, parse the lessonId query parameter and save it as state
				const parsedLessonId = parseInt(router.query["lessonId"] as string);

				if(isNaN(parsedLessonId)) {
					throw new Error("Error: the lesson ID in the query is invalid");
				}

				setLessonId(parsedLessonId);
			}
			catch(err) {
				alert("Error: failed to fetch the lesson! Please try again later.");
				console.error(err);
			}

			if(lessonId !== undefined) {
				// then fetch the lesson details from the API
				fetchLesson(lessonId!).then(lesson => {
					setLesson(lesson);
				}).catch(err => {
					alert("Error: failed to fetch the lesson! Please try again later.");
					console.error(err);
				});
			}
		}
	}, [ router.isReady, lessonId ]);

	// When the lesson is retrieved, request the first part of the lesson content
	useEffect(() => {
		if(lessonId !== undefined) {
			getLessonPart(lessonId, currentPart).then(resp => {
				if("error" in resp) {
					throw resp.error;
				}

				addMessage(resp.content);
			}).catch(err => {
				alert("Error: failed to fetch the lesson part! Please try again later.");
				console.error(err);
			});
		}
	}, [ lessonId ]);


	// Render
	return (
		<>
			<Head>
				<title>Lesson | Conversant</title>
			</Head>

			<Background>
				<div id={styles["page"]}>
					<Head>
						<title>
							{ (lesson !== undefined) ? `${lesson.title} (${lesson.topicLabel})` : "Lesson"} | Conversant
						</title>
					</Head>
	
					<div id={styles["sidebar"]} className={(sidebarIsOpen) ? styles["open"] : ""}>
						<Sidebar />
					</div>
	
					<div id={styles["title-bar"]}>
						<TitleBar toggleSidebarOpen={toggleSidebarOpen} sidebarOpen={sidebarIsOpen} lessonTitle={lesson?.title ?? "Loading..."} lessonTopic={lesson?.topicLabel ?? ""} />
					</div>
	
					<div id={styles["message-area"]}>
						<ConversationArea messages={messages} />
					</div>
	
					<div id={styles["reply-bar"]}>
						<SendMessageForm messageSentHandler={sendMessageHandler} disabled={lesson === undefined} />
					</div>
				</div>
			</Background>
		</>
	);
};

export default LessonPage;


/**
 * Helper function to retrieve the lesson's information from the API.
 */
async function fetchLesson(lessonId: number): Promise<Lesson> {
	const resp = await fetch(`/api/lesson/${lessonId}`);

	if(! resp.ok) {
		throw new Error(`API request to retrieve lesson information failed with status ${resp.status} (${resp.statusText})`);
	}

	const body = await resp.json() as LessonApiRouteResponse;

	if("error" in body) {
		throw new Error(body.error);
	}

	return body.lesson;
}


/**
 * Helper function to retrieve an individual message as part of a lesson from the API.
 */
async function getLessonPart(lessonId: number, part: number): Promise<PartApiRouteResponse> {
	const resp = await fetch(`/api/lesson/${lessonId}/part/${part}`).catch(err => { throw err; });

	if(! resp.ok) {
		throw new Error("failed to fetch the lesson part");
	}

	const body = await resp.json() as PartApiRouteResponse;

	if("error" in body) {
		throw new Error(body.error);
	}
	
	return body;
}