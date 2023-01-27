# monee (WIP)

**monee** is a simple web app to consolidate your bank statements in one place and analyze your spending behaviour. Here's how it's supposed to work

1. You upload your bank statements (csv) of a certain period
2. The statement is parsed and stored as a generic record on DB
3. You can see different statistics on the UI including filtering, searching and grouping

Repeat steps 1-3 according to your needs

For parsing the statements, we need different parser configs as each bank statement is different in structure. For the lifetime of this project, I will only add parser configs for *Bangladeshi* banks. Feel free to modify it according to your needs. More on how to add parsers will come later as the project progresses.

This is a *work-in-progress (WIP)*. Although this is a web app, it is meant to be used individually at least for the time being. After all, I am making this for my personal use and thought it would be a good project to share. Or maybe I will make it a production grade application later having thousands of users, who knows?

---

# Motivation
Firstly, I'm making this to learn FastAPI. I am loving it.

Secondly, I cannot use expense tracking apps properly. Most of the times, I forget adding the entries. Besides, it's incovenient to manually do this. So I thought, why not directly use bank statements? It's the single source of truth of my finance maintained by my bank(s). I know I wouldn't have granular description of each expense, but again, in most cases that's not what I'm looking for. Thus this project was born.

Before you ask, No, the banks in my country are not good enough to provide APIs for user data consumption, let alone any advance kind of digitization.

# Stack
- Python
- FastAPI
- MySQL
- React
- Docker


# How to use
1. Run the containers using `docker-comopse up`
2. Go to `localhost:5000` and create a bank account from the Accounts section.
3. Upload the `.csv` version of your bank statement. Please note, many banks provide the statement in `.xlsx`/`.xls` format. For the time being, you have to use a conversion tool (plenty available online) to create `.csv` from it. In future, the conversion ability will be added within the app
4. You should be able to see an analysis summary on your Dashboard


# Development
I used container-first approach for Development. Using docker-compose, you can immediately start using/developing this tool.

For development purpose, feel free to use `virtualenv`, `nvm` or any. But the recommended approach would be to remotely connect to the container in VSCode and do the development there.

1. In VSCode, install the Dev Container extension
2. Open VSCode command prompt (Ctrl + P / Command + P) and find the option `> Attach to running continer`
3. Select the container that you want to connect
4. Once the container loads, install necessary extensions on the container as requried. If you're working with the FastAPI server, it's highly recommended to use `Flake8` and `Python` extensions.
