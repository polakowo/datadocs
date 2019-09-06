---
id: production-code
title: Production Code
sidebar_label: Production Code
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/production-code.md
---

- Software running on production servers to handle live users and data of the intended audience.
- Production quality code describes code that meets expectations for production.
    
## Refactoring

- Restructuring code to change its internal structure, without changing its external functionality.
- Pays off by speeding up development time in the long run.
- Helps becoming a stronger programmer when constantly looking to improve the code.
- First get the sh*t done, and only then refactor.

#### Writing clean code

> Can I understand the code easily?  
Does it use meaningful names and whitespace?  

- Clean code: 
    - Readable, simple, and concise. 
    - Crucial for collaboration and maintainability in software development.
- Use meaningful names:
    - For booleans, you can prefix with `is_` or `has_` to make it clear it is a condition.
    - Use part of speech to imply types, like verbs for functions and nouns for variables.
    - Avoid abbreviations and especially single letters (except counters and common math variables) 
    - Certain variables may be common knowledge among data scientists, but it might be necessary to provide more descriptive names for software engineers.
    - Names should be descriptive, but only with relevant information.
- Use whitespace properly:
    - Organize code with consistent indentation (4 spaces)
    - Separate sections with blank lines to keep the code well organized and readable.
    - Limit the lines to around 79 characters, which is the guideline given in the PEP 8 style guide. 
- [PEP 8 guidelines for code layout](https://www.python.org/dev/peps/pep-0008/?#code-lay-out)

```py
# Example: Variable names not consistent

t = end_time - start  # compute execution time
c = category(t)  # get category of task
print('Task Duration: {} seconds, Category: {}'.format(t, c)
```

```py
# Example: Clean code

execution_time = end_time - start_time
category = categorize_task(execution_time)
print('Task Duration: {} seconds, Category: {}'.format(execution_time, category)
```

#### Writing modular code

> Is there any duplicated code?  
Can you provide another layer of abstraction?  
Is there any function or module unnecessary?  
Is there any function or module too long?

- Modular code:
    - Logically broken up into functions and modules. 
    - Modules allow code to be reused by encapsulating them into files that can be imported.
    - Makes code more organized, efficient, and reusable.
- DRY (Don't Repeat Yourself):
    - Modularization allows reusing parts of code. 
    - Generalize and consolidate repeated code in functions or loops.
- Abstract out logic to improve readability:
    - But it is possible to over-engineer things and have way too many modules.
- Minimize the number of entities (functions, classes, modules, etc.):
    - Creating more modules doesn't necessarily result in effective modularization.
    - There are tradeoffs to having function calls instead of inline logic. 
    - An unnecessary amount of entities forces you to jump around everywhere.
- Functions should do one thing:
    - If a function is doing multiple things, it becomes more difficult to generalize and reuse. 
    - Generally, if there's an `_and_` in your function name, consider refactoring.
- Try to use fewer than three arguments per function (there are exceptions, matplotlib?)

#### Writing efficient code

> Are there loops or other steps we can vectorize?  
Can we use better data structures to optimize any steps?  
Can we shorten the number of calculations needed for any steps?  
Can we use generators or multiprocessing to optimize any steps?

- Optimizing code to be more efficient can mean making it:
    - Execute faster (especially on larger data)
    - Take up less space in memory/storage.

## Documentation

> Are the in-line comments concise and meaningful?  
Is there any complex code that's missing documentation?  
Does every function use effective docstrings?  
Is the necessary project documentation provided?

- An additional text or illustrated information that comes with or is embedded in the code of software.
- Helpful for:
    - Clarifying complex parts of code.
    - Making code easier to navigate.
    - Quickly conveying how and why different components of program are used.
- Writing documentation helps improving the code design, as you're forced to think through your design decisions more thoroughly. 

#### In-line comments

- Used is to document the major steps of complex code to help readers follow.
- Comments are valuable for explaining where code cannot (why it is implemented a specific way?)
- But sometimes, if code requires comments to follow, it is a sign that refactoring is needed.

#### Docstrings

- Documentation strings explain the purpose and functionality of a function or module.
- Each function should always have a docstring.
- The first line of the docstring is a brief explanation of the function's purpose.

```py
# Example: One line docstring

def population_density(population, land_area):
    """Calculate the population density of an area."""
    return population / land_area
```

- The next elements of a docstring is an explanation of the function's arguments and output.
- You can add whatever details you want in a docstring (it's optional)

```py
# Example: Multi line docstring

def population_density(population, land_area):
    """Calculate the population density of an area.

    Args:
    population: int. The population of the area
    land_area: int or float. This function is unit-agnostic.

    Returns:
    population_density: population/land_area. The population density of a particular area.
    """
    return population / land_area
```

- [PEP 257 - Docstring Conventions](https://www.python.org/dev/peps/pep-0257/)
- [NumPy Docstring Guide](https://numpydoc.readthedocs.io/en/latest/format.html)

#### Project Documentation

- Project documentation is essential for getting others to understand why code is relevant to them.
- A great first step in project documentation is README file (for first interaction with the user)
- README explains what it does, lists its dependencies, and provides instructions on how to use it. 
    - Also allows future contributors to know how to follow your original intentions.
    - [About READMEs](https://help.github.com/en/articles/about-readmes)

## Git

- Git is a distributed version-control system for tracking changes in source code.
- [A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/)
- [About merge conflicts](https://help.github.com/articles/about-merge-conflicts/)

#### Model Versioning

- Version control is a system that records changes to a file or set of files over time so that you can recall specific versions later.
- Version control in data science can be tricky.
- [How to Version Control Your Production Machine Learning Models](https://blog.algorithmia.com/how-to-version-control-your-production-machine-learning-models/)
- [Versioning Data Science](https://shuaiw.github.io/2017/07/30/versioning-data-science.html)

## Testing

> Does the code have high test coverage?  
Do the tests check for interesting cases?  
Are the tests readable?  
Can the tests be made more efficient?

- Testing is the process of evaluating a system or its component(s) with the intent to find whether it satisfies the specified requirements.
- Testing is essential before deployment. 
- Helps catching errors and faulty conclusions before they make any major business impact.
- Problems that could occur in data science aren’t always easily detectable:
    - Values being encoded incorrectly
    - Features being used inappropriately
    - Unexpected data breaking assumptions
- [Four Ways Data Science Goes Wrong and How Test Driven Data Analysis Can Help](https://www.predictiveanalyticsworld.com/patimes/four-ways-data-science-goes-wrong-and-how-test-driven-data-analysis-can-help/6947/)
- [Ned Batchelder: Getting Started Testing](https://speakerdeck.com/pycon2014/getting-started-testing-by-ned-batchelder)

#### Unit tests

- Unit testing involves breaking the program into pieces, and subjecting each piece to a series of (independent) tests.
- The advantage of unit tests is that they are isolated, thus, no dependencies are involved. 
    - They don't require access to databases, APIs, or other external sources.
- However, passing unit tests isn’t always enough to prove that the program is working successfully. 
- Use integration tests to test whether they are communicating and transferring data correctly.
    - [Integration Testing](https://www.fullstackpython.com/integration-testing.html)
- Testing with pytest:
    - Create a test file starting with `test_`
    - Define unit test functions that start with `test_` inside the test file.
    - It's wise to have only one `assert` statement per test.
    - Run `pytest` in the directory of the defined test files.
- [Unit Testing](https://www.fullstackpython.com/unit-testing.html)

#### Test-driven development

- The Test Driven Development (TDD) is a software engineering practice that requires unit tests to be written before the code they are supposed to validate.
    - [Introduction to Test Driven Development (TDD)](https://hackernoon.com/introduction-to-test-driven-development-tdd-61a13bc92d92)
    - [Testing Your Code](http://docs.python-guide.org/en/latest/writing/tests/)
- Tests can check for all the different scenarios and edge cases before even starting to code.
    - The test then can be run to get immediate feedback on whether it works or not.
- TDD for data science is relatively new and has a lot of experimentation and breakthroughs appearing.
    - [Data Science TDD](https://www.linkedin.com/pulse/data-science-test-driven-development-sam-savage/)
    - [TDD for Data Science](http://engineering.pivotal.io/post/test-driven-development-for-data-science/)
    - [TDD is Essential for Good Data Science Here's Why](https://medium.com/@karijdempsey/test-driven-development-is-essential-for-good-data-science-heres-why-db7975a03a44)

## Logging

> Are log messages clear, concise, and professional?  
Do they include all relevant and useful information?  
Do they use the appropriate logging level?  

- Logging is a means of tracking events that happen when some software runs (e.g. over night)
- Good examples of log messages:
    - Be professional and clear: "Couldn't parse file"
    - Be concise and use normal capitalization: "Generating product recommendations"
    - Provide any useful information: "Failed to read location data: store_id 8324971"
    - Choose the appropriate level for logging: `DEBUG` (anything that happens), `ERROR` (any error that occurs), `INFO` (any user-driven or system-specific operation)

## Code review

- Represents the process of reviewing someone's code before it gets merged.
- [Code Review](https://github.com/lyst/MakingLyst/tree/master/code-reviews)
- [Code Review Best Practices](https://www.kevinlondon.com/2015/05/05/code-review-best-practices.html)

#### Tips for conducting a code review

- Using a Python code linter like pylint for coding standards and PEP 8 guidelines.
- Agree on a style guide as a team to handle disagreements on code style.
- Rather than commanding people to change their code a specific way, explain to them the consequences of the current code and suggest changes to improve it.
- Promote a constructive discussion, rather than opposition.

```text
BAD: Make model evaluation code its own module - too repetitive.
GOOD: How about we consider making the model evaluation code its own module? This would simplify models.py to only include code for building models. Organizing these evaluations methods into separate functions would also allow us to reuse them with different models without repeating code.
```

- Avoid comments that sound personal to bring the attention of the review to the code.

```text
BAD: I wouldn't groupby genre twice like you did here... Just compute it once and use that for your aggregations.
GOOD: Can we group by genre at the beginning of the function and then save that as a groupby object? We could then reference that object to get the average prices and views without computing groupby twice.
```

- When providing a code review, write out code suggestions.

```text
BAD: You can do this all in one step by using the pandas str.split method.
GOOD: We can actually simplify this step to the line below using the pandas str.split method. Found this on this stack overflow post: https://stackoverflow.com/questions/14745022/how-to-split-a-column-into-two-columns
```
