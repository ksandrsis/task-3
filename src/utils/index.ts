const parse = <T>(data: Response): Promise<T> => data.json();

export default parse;
