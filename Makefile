run:
	npm run dev

commit:
	git add .
	git commit -m "updated $(shell date +%Y-%m-%d)"
	git push origin master
	