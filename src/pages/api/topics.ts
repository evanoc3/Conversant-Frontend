import type { NextApiRequest, NextApiResponse } from "next";
import type { ServerlessMysql } from "serverless-mysql";
import { connectToDatabase } from "@util/database";
import type { ITopicsTableRow } from "@customTypes/database";
import type { ApiResponse } from "@customTypes/api";


/**
 * Typescript interface for the JSON serialized value returned by this API route.
 */
export type Response = ApiResponse<{
	results: ITopicsTableRow[]
}>


/**
 * Main function for this API route.
 */
export default async function TopicsApiRoute(req: NextApiRequest, res: NextApiResponse) {
	let mysql: ServerlessMysql | undefined;

	try {
		// parse parameter from request query
		const query = (req.query["query"] as string) ?? "";

		// connect to the database
		const mysql = await connectToDatabase();

		// perform the query
		const topics = await getSearchResultsForTopic(mysql, query);

		// send an OK response
		res.status(200).json({
			timestamp: (new Date()).toISOString(),
			results: topics
		} as Response);
	}
	catch(err) {
		// If any errors get thrown, send an Error response
		res.status(500).json({
			timestamp: (new Date()).toISOString(),
			error: (err as Error).message
		} as Response)
	}
	finally {
		// Perform Serverless MySQL cleanup
		if(mysql !== undefined) {
			await mysql.end();
		}
	}
};


/**
 * Helper function to retrieve rows from thr database.
 * 
 * @throws {Error} if the database query fails for any reason
 */
async function getSearchResultsForTopic(mysql: ServerlessMysql, topic: string): Promise<ITopicsTableRow[]> {
	const rows = await mysql.query<ITopicsTableRow[]>(
		"SELECT id, label, description, firstLesson FROM topics WHERE label LIKE ? LIMIT 20",
		[ `%${topic}%` ]
	).catch(err => {
		console.error("Error: failed to query database for topics. Error message: ", err);
		throw err;
	});


	return rows;
} 