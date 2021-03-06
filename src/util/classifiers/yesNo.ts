import { BayesClassifier } from "natural";


/**
 * Obtained as the output of `yesNo-factory.js`.
 */
const serializedClassifier = `{"classifier":{"classFeatures":{"true":{"0":8,"1":3,"2":3,"3":4,"4":4,"5":2,"6":4,"7":16,"8":2,"9":6,"10":5,"11":6},"false":{"7":14,"9":10,"10":8,"12":11,"13":4,"14":10,"15":2,"16":3,"17":10,"18":11,"19":2,"20":7,"21":2,"22":2,"23":4}},"classTotals":{"true":39,"false":42},"totalExamples":80,"smoothing":1},"docs":[{"label":"true","text":["ye"]},{"label":"true","text":["ye"]},{"label":"true","text":["yea"]},{"label":"true","text":["yeah"]},{"label":"true","text":["total"]},{"label":"true","text":["complet"]},{"label":"true","text":["absolut"]},{"label":"true","text":["sure"]},{"label":"true","text":["sure"]},{"label":"true","text":["ye"]},{"label":"true","text":["ye"]},{"label":"true","text":["yea"]},{"label":"true","text":["yeah"]},{"label":"true","text":["understand"]},{"label":"true","text":["understand","clearli"]},{"label":"true","text":["understand","complet"]},{"label":"true","text":["ye","understand"]},{"label":"true","text":["ye","understand"]},{"label":"true","text":["understand"]},{"label":"true","text":["understand"]},{"label":"true","text":["think","understand"]},{"label":"true","text":["think","understand"]},{"label":"true","text":["think","understand","ye"]},{"label":"true","text":["clear"]},{"label":"true","text":["clear"]},{"label":"true","text":["clear"]},{"label":"true","text":["think","clear"]},{"label":"true","text":["think"]},{"label":"true","text":["kind"]},{"label":"true","text":["kind"]},{"label":"true","text":["kind","understand"]},{"label":"true","text":["kind","understand"]},{"label":"true","text":["kind","understand"]},{"label":"true","text":["total","understand"]},{"label":"true","text":["total"]},{"label":"true","text":["complet"]},{"label":"true","text":["sure"]},{"label":"true","text":["understand"]},{"label":"false","text":["no"]},{"label":"false","text":["nope"]},{"label":"false","text":["not","realli"]},{"label":"false","text":["not"]},{"label":"false","text":["not"]},{"label":"false","text":["isn"]},{"label":"false","text":["don"]},{"label":"false","text":["dont"]},{"label":"false","text":["not"]},{"label":"false","text":["don","understand"]},{"label":"false","text":["dont","understand"]},{"label":"false","text":["no","don","understand"]},{"label":"false","text":["no","dont","understand"]},{"label":"false","text":["isn","clear"]},{"label":"false","text":["isnt","clear"]},{"label":"false","text":["not","clear"]},{"label":"false","text":["don"]},{"label":"false","text":["dont"]},{"label":"false","text":["not"]},{"label":"false","text":["not","understand"]},{"label":"false","text":["don","understand"]},{"label":"false","text":["dont","understand"]},{"label":"false","text":["don","think","understand"]},{"label":"false","text":["dont","think","understand"]},{"label":"false","text":["don","think","understand"]},{"label":"false","text":["dont","think","understand"]},{"label":"false","text":["don","think","understand"]},{"label":"false","text":["dont","think","understand"]},{"label":"false","text":["not","think","clear"]},{"label":"false","text":["dont","think","clear"]},{"label":"false","text":["don","think","clear"]},{"label":"false","text":["no","sorri"]},{"label":"false","text":["no","sorri","not","clear"]},{"label":"false","text":["no","sorri","dont"]},{"label":"false","text":["sorri","no"]},{"label":"false","text":["sorri","nope"]},{"label":"false","text":["pardon"]},{"label":"false","text":["no","excus"]},{"label":"false","text":["lol","nope"]},{"label":"false","text":["lol","no"]},{"label":"false","text":["lol","no","sorri"]}],"features":{"ye":7,"yea":2,"yeah":2,"total":3,"complet":3,"absolut":1,"sure":3,"understand":28,"clearli":1,"think":14,"clear":11,"kind":5,"no":10,"nope":3,"not":9,"realli":1,"isn":2,"don":9,"dont":10,"isnt":1,"sorri":6,"pardon":1,"excus":1,"lol":3},"stemmer":{},"lastAdded":79,"events":{"_events":{},"_eventsCount":0}}`;


/**
 * Typescript enum containing the possible classication labels for the classifier in this module.
 */
export enum Classes {
	True = "true",
	False = "false"
}


export function getClassifier(): BayesClassifier {
	const classifier = BayesClassifier.restore(JSON.parse(serializedClassifier));
	return classifier;
}
