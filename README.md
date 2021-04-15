## Prerequisites

- Node.js
- npm
- Terraform (only for deployments)

## Installation

In the root of the project run below command.
```bash
$ npm install
```

After that create __.env.local__ file in the root of the project and fill it with enviroment variables. You can find their names inside __.env.local.example__

## Running the app
```bash
$ npm run dev
```

## Deployment

Build project with below command
```bash
$ npm run tf-next
```

After build run set of following commands

```bash
$ export AWS_ACCESS_KEY_ID="your-access-key-id"
$ export AWS_SECRET_ACCESS_KEY="your-secret-access-key"

$ terraform init    # Only needed on the first time running Terraform

$ terraform plan    # (Optional) See what resources Terraform will create
$ terraform apply   # Deploy the Next.js app to your AWS account
```

## Acknowledgements
* [terraform-aws-next-js](https://github.com/dealmore/terraform-aws-next-js)
