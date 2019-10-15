---
id: deep-learning
title: Deep Learning
sidebar_label: Deep Learning
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/deep-learning/deep-learning.md
---

- Deep learning is a branch of machine learning that covers the set of algorithms that model complex patterns by feeding data through multiple non-linear transformations causing each level to capture a different level of abstraction.
- Deep learning algorithms seek to exploit the unknown structure in the input distribution.
- The word “learning” describes an automatic search process for better representation of the data.
    - The key aspect of deep learning is that the layers of features are not designed by human engineers. 
    - A deep learning process can learn which features to optimally place in which level on its own.
- Most modern deep learning models are based on an ANNs.

#### Compared to AI and ML

- AI >> ML >> DL
- AI enables machines to mimic human intelligence, using logic and machine learning.
- ML is a subset of AI that enables machines to improve at tasks with experience.
- DL is a subset of ML that exposes multi-layered neural networks to vast amounts of data.

## Rise of deep learning

- Deep learning is taking off due to a large amount of data available through:
    - Digitization of the society
    - Faster computation
    - Innovation in the development of neural network algorithms
> Previously, the labeled datasets were too small, the computers were too slow, the weights were initialized poorly, and the wrong type of non-linearity was used - Geoff Hinton
- Neural networks are extremely better than traditional methods because of the advances in hardware (mostly GPUs, now TPUs), and the exponential generation and accumulation of data.

<img width=450 src="/datadocs/assets/riseofDeeplearning.jpg"/>
<center><a href="http://bytes.schibsted.com/deep-learning-changing-data-science-paradigms/" class="credit">Credit</a></center>

- Another reason that deep learning has taken off is because of important theoretical and algorithmic improvements, mainly in supervised learning.

<img width=900 src="/datadocs/assets/deepLearningTimeline.png"/>
<center><a href="https://towardsdatascience.com/a-weird-introduction-to-deep-learning-7828803693b0" class="credit">Credit</a></center>

## Hierarchical learning

- Deep learning is a class of ML algorithms that learn a hierarchical representation of the data.
- Each level learns to transform its input data into a slightly more abstract and composite representation.
- The most attractive thing about DL is that it is motivated by the way the world works: 
    - The world is compositional, atoms form molecules, and molecules form organisms.
- In literature we have *letters->words->sentences->paragraph*, just as in vision we have *pixels->edges->parts->objects*.

<img width=500 src="/datadocs/assets/featureLearning.jpg"/>
<center><a href="https://www.picswe.com/pics/feature-learning-a0.html" class="credit">Credit</a></center>

## Deep neural networks

- Neural networks have individual units (neurons) are connected in an directed acyclic graph (DAG).
- Deep NNs have more layers between input and output:
    - This allows richer intermediate representations to be built. 
    - More of the feature engineering can be achieved by the algorithm itself.
- They generate compositional models where object is expressed as a layered composition of primitives.

<img width=400 src="/datadocs/assets/0*0mia7BQKjUAuXeqZ.jpeg"/>
<center><a href="http://cs231n.github.io/neural-networks-1/" class="credit">Credit</a></center>

#### Universal function approximators

- NNs with at least one hidden layer are universal approximators:
    - They can compute and learn any function at all. 
- Almost any process we can think of can be represented as a functional computation in NNs.

<img width=400 src="/datadocs/assets/decisionBoundary.jpg"/>
<center><a href="https://www.learnopencv.com/understanding-feedforward-neural-networks/" class="credit">Credit</a></center>

- The fact that deeper networks (with multiple hidden layers) can work better than a single-hidden-layer networks is an empirical observation, despite the fact that their representational power is equal.
- [A visual proof that neural nets can compute any function](http://neuralnetworksanddeeplearning.com/chap4.html)

#### Pros

- Scalability of neural networks:
    - Scales well to larger datasets with new GPU hardware and CUDA software.
    - Results (usually) get better with more data and larger models.
- Ability to perform automatic feature extraction from raw data, also called feature learning.
- Relatively simple learning algorithm (SGD and backpropagation)
- Information such as in traditional programming is stored on the entire network, not on a database.
- The disappearance of a few pieces of information in one place does not prevent the network from functioning (think of brain damage)
- Parallel processing capabilities.

#### Cons

- DNNs are prone to overfitting because of the added layers of abstraction.
    - This allows them to learn noise.
- Hard to interpret the model. 
    - They are a black boxes once they are trained.
- Don't perform as well on small data sets. 
    - The Bayesian approaches do have an advantage here.
- There is no specific rule for determining appropriate structure but through trial and error.
- They are computationally intensive to train:
    - You need a lot of chips and a distributed run-time to train on very large datasets.
- Sometimes DL can be an overkill:
    - Traditional ML algorithms still work for smaller problems with little data availability.
    - Clustering still works for some unsupervised learning problems.

## Biology

- Deep learning models are vaguely inspired by information processing and communication patterns in biological nervous systems.
- Yet they have various differences from the structural and functional properties of biological brains (especially human brains), which make them incompatible with neuroscience evidences.
- For example, there are many different types of neurons, each with different properties. 
    - The dendrites in biological neurons perform complex nonlinear computations. 
    - The synapses are not just a single weight, they’re a complex non-linear dynamical system.
    - [Dendritic Computation](https://neurophysics.ucsd.edu/courses/physics_171/annurev.neuro.28.061604.135703.pdf)
- Nevertheless, the computations performed by deep learning units could be similar to those of actual neurons and neural populations. 
    - Similarly, the representations developed by deep learning models are similar to those measured in the primate visual system both at the single-unit and at the population levels.
- Other researchers have argued that unsupervised forms of deep learning, such as those based on hierarchical generative models and deep belief networks, may be closer to biological reality.

<img width=500 src="/datadocs/assets/biologicalNeuron.png"/>
<center><a href="https://www.mentalconstruction.com/mental-construction/neural-connections/neural-threshold/attachment/generic-neuron-input-output/" class="credit">Credit</a></center>

## Architectures

- Modern state-of-the-art deep learning is focused on training deep (multi-layered) neural network models using the backpropagation algorithm.
- Most deep learning techniques are extensions or adaptions of ANNs. 
- Different configurations are suitable for different machine learning tasks.
- [AI Knowledge Map: how to classify AI technologies](https://medium.com/@Francesco_AI/ai-knowledge-map-how-to-classify-ai-technologies-6c073b969020?fbclid=IwAR1mrs0KqMNST6AwqBFFZFWJmWNs34NFoADNk_LT-3o27w2nEyFfmBB9T_Q)

<img width=800 src="/datadocs/assets/knowledgeMap.jpeg"/>
<center><a href="https://www.kdnuggets.com/2018/08/ai-knowledge-map-classify-ai-technologies.html" class="credit">Credit</a></center>

## Challenges

- DL is a tool for perceptual classification, when general intelligence involves so much more.
    - The biggest obstacle in terms of real A(G)I for the current wave of Deep Learning is almost total lack of abstract reasoning.
- Back-propagation has trouble generalizing outside a space of training examples. 
    - Therefore, current models cannot account for those cognitive phenomena that involve universals that can be freely extended to arbitrary cases.
- State-of-the-art DNNs perform image classification well but are still far from true object recognition. 
    - [Strike (with) a Pose: Neural Networks Are Easily Fooled by Strange Poses of Familiar Objects (2018)](https://arxiv.org/pdf/1811.11553.pdf)

<img width=400 src="/datadocs/assets/confusion.jpeg"/>
<center><a href="https://medium.com/@GaryMarcus/the-deepest-problem-with-deep-learning-91c5991f5695" class="credit">Credit</a></center>

- RL: We are beginning to realize that there are major complexity problems with regards to the entire ML paradigm of specifying reward functions and optimizing based on these rewards.
- Deep learning is:
    - Data hungry: Lacks a mechanism for learning abstractions through explicit, verbal definition, and works best when there are millions of training examples.
    - Swallow: There is, so far, no good way to carry training from one set of circumstances to another.
    - Not sufficiently transparent: The transparency issue, as yet unsolved, is a potential liability when using deep learning for problem domains like financial trades or medical diagnosis.
    - Difficult to engineer: Engineering risks could be particularly problematic with deep learning given their statistical nature, opacity, and difficulty distinguishing causation from correlation.
- [Deep Learning: A Critical Appraisal (2017)](https://arxiv.org/pdf/1801.00631.pdf)
- [The deepest problem with deep learning](https://medium.com/@GaryMarcus/the-deepest-problem-with-deep-learning-91c5991f5695)

## Future research
- Deep Learning is an active field of research: 
    - We are still searching for the best models, topology of the networks, best ways to optimize their hyperparameters and more.
- We should and will see more benefits coming from the unsupervised side of the tracks as the field matures to deal with the abundance of unlabeled data available. 
    - Unsupervised feature learning approaches, like Autoencoders, would automatically make conclusions from similar observations. 
    - Then manually labeling these conclusions can be practical, and this is the way curiosity of computers are satisfied.
- Deep learning and symbol-manipulation will co-exist:
    - With deep learning handling many aspects of perceptual classification, but symbol-manipulation playing a vital role in reasoning about abstract knowledge. 
    - Gradient descent plus symbols, not gradient descent alone.
- Deep Reinforcement Learning is another future direction:
    - The model behaves more like to a human by interacting with the noisy environment and making precise decisions upon given scalar reward value.
- Interpretation techniques for deep learning
- Bayesian deep learning
- Meta-learning will be the new SGD.
- Generative models will drive a new kind of modeling.
