---
id: normalization
title: Normalization
sidebar_label: Normalization
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/deep-learning/normalization.md
---

## Input normalization

- By normalizing all of our inputs to a standard scale, we're allowing the network to more quickly learn the optimal parameters for each input node.

<img width=700 src="/datadocs/assets/20180128.png"/>
<center><a href="https://jsideas.net/batch_normalization/" class="credit">Credit</a></center>

- You want to transform your input into the regions that can utilize the non-linearity of your activation function, and not suffer saturation.
- It is usually better to have the input values centered around zero, and this is coupled with the weights initialization heuristics which initialize weights around zero
- Additionally, it's useful to ensure that our inputs are roughly in the range of -1 to 1 to avoid weird mathematical artifacts associated with floating point number precision

#### Methods

- Standard scaler approach: The most popular method is subtracting the mean and dividing by the standard deviation.
- Min-Max Scaling: this feature transformation puts your features in a predefined range (like 0 to 1). It can be useful when you have a lot of one-hot encoded features together with dense features. Instead of letting your dense features have different ranges than the OHE ones, this will put them in the same range.
- Robust Scaling: let’s say you have some big outliers, but you don’t want your scaling to be affected by them. This type of scaling takes into account the median and interquartile ranges instead of using the mean and standard deviation. It helps you avoid extreme values.

## Batch normalization

#### Internal covariate shift

- As learning progresses, each hidden unit’s input distribution changes every time there is a parameter update in the previous layer
- This can result in most inputs being in the nonlinear regime of the activation function and slow down learning
- This in turn makes training slow and requires a very small learning rate and a good parameter initialization

#### Solution

- We can think of any layer in a neural network as the first layer of a smaller subsequent network
- BN is divided in two sub-operations:
  - First sub-operation will normalize activation output, dimension-wise with zero mean and unit variance within a mini-batch of training set
  - Second sub-operation will optimally shift and scale these normalized activations.

#### 1. Normalization

- The basic idea behind batch normalization is to limit covariate shift by normalizing the activations of each layer
- By normalizing each layer, we're introducing a level of orthogonality between layers

<img width=600 src="/datadocs/assets/prepro1.jpeg"/>
<center><a href="http://cs231n.github.io/neural-networks-2/" class="credit">Credit</a></center>

- [Setting up the data and the model](http://cs231n.github.io/neural-networks-2/)

#### 2. Shifting and scaling

- In practice, restricting the activations of each layer to be strictly 0 mean and unit variance can limit the expressive power of the network. Therefore, in practice, batch normalization allows the network to learn parameters $\gamma$  and $\beta$ that can convert the mean and variance to any value that the network desires.
- This extra flexibility helps to represent identity transformation and preserve the network capacity.

<img width=600 src="/datadocs/assets/Screenshot from 2017-03-23 21-50-33.png"/>
<center><a href="http://tzutalin.blogspot.com/2017/07/deep-learning-batch-normalization-note.html" class="credit">Credit</a></center>

- [Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift (2015)](https://arxiv.org/pdf/1502.03167v3.pdf)

#### Pros

- The network should converge much more quickly
- Using batch normalisation allows much higher learning rates, increasing the speed at which networks train.
- Batch normalisation helps reduce the sensitivity to the initial starting weights.
- As batch normalisation regulates the values going into each activation function, nonlinearities that don’t work well in deep networks tend to become viable again.
- Simplifies the creation of deeper networks
- You can consider batch normalisation as a bit of extra regularization, allowing you to reduce some of the dropout you might add to a network. Similar to dropout, it adds some noise to each hidden layer’s activations.

<img width=400 src="/datadocs/assets/ModelAccuracy.png"/>
<center><a href="https://www.learnopencv.com/batch-normalization-in-deep-networks/" class="credit">Credit</a></center>

#### Best practices

- During training you have to consider a mini-batch at a time. This requirement of mini-batch training is for learning of two extra parameters for every dimension for every hidden layers along with the weights associated with the network.
- Note that batch normalization occurs after each fully-connected layer, but before the activation function and dropout
- To get the normalization parameters, which will be used during inference, you can take average of parameters calculated from many equal size mini-batch training. Alternatively, during training, you can track the moving averages of normalization parameters
