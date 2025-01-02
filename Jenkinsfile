pipeline {
    agent any

    environment {
        KUBECONFIG_PATH = "${env.WORKSPACE}/kubeconfig"
        DEPLOYMENT_YAML_PATH = "${env.WORKSPACE}/k8s/deployment.yaml"
        SERVICE_YAML_PATH = "${env.WORKSPACE}/k8s/service.yaml"
        IMAGE_NAME = "pierreas/accountportal-v1"
        IMAGE_TAG = "1.0.0"
        DOCKER_HUB_CREDENTIALS = 'docker-hub-credentials-id'
        FULL_IMAGE_NAME = "${env.IMAGE_NAME}:${env.IMAGE_TAG}"
    }

    stages {

        stage('Install Angular Dependencies') {
            steps {
                script {
                    echo "Installing Angular dependencies..."
                    powershell '''
                        npm install
                    '''
                }
            }
        }

        stage('Build Angular App') {
            steps {
                script {
                    echo "Building Angular app..."
                    powershell '''
                        npm run build --omit=dev
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image for Angular app..."
                    powershell '''
                        docker build -t $env:FULL_IMAGE_NAME .
                    '''
                }
            }
        }

        stage('Docker Login And Push To DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "$DOCKER_HUB_CREDENTIALS", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASSWORD')]) {
                    script {
                        echo "Logging into Docker..."
                        powershell '''
                            docker login -u $env:DOCKER_USER -p $env:DOCKER_PASSWORD

                            docker push $env:FULL_IMAGE_NAME
                        '''
                    }
                }
            }
        }

        stage('Apply Kubernetes Deployment + Service') {
            steps {
                script {
                    echo "Applying Kubernetes Deployment + Service..."
                    powershell '''
                        $env:KUBECONFIG = "$env:KUBECONFIG_PATH"
                        kubectl apply -f $env:DEPLOYMENT_YAML_PATH
                        kubectl apply -f $env:SERVICE_YAML_PATH
                        kubectl apply -f $env:HPA_YAML_PATH

                        # Check if rollout is needed
                        kubectl rollout status deployment accountportal-deployment
                        kubectl rollout restart deployment accountportal-deployment
                    '''
                }
            }
        }
    }
}
