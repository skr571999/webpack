it("should support hot module replacement in WebWorkers", done => {
	const worker = new Worker(new URL("worker.js", import.meta.url));
	worker.onmessage = ({ data: msg }) => {
		switch (msg) {
			case "next":
				NEXT(() => {
					worker.postMessage("next");
				});
				break;
			case "done":
				done();
				break;
		}
	};
	worker.postMessage("test");
	Promise.resolve(worker.terminate()).then(done, done);
});
