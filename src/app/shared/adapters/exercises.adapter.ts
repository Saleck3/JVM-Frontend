function adaptExercises(data: any) {
	const exercises = data.exercises.map((exercise: any) => {
		const { id, exerciseType, parameters } = exercise;

		const parsedParameters = JSON.parse(parameters);
		return {
			id,
			exerciseType,
			params: parsedParameters,
		};
	});

	return { moduleId: data.moduleId, exercises };
}

function adaptScore(data: any) {
	return data;
}

export { adaptExercises, adaptScore };
