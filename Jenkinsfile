pipeline {
    agent {
        docker {
            image 'boisvert/python-build'
            args '-v /var/run/docker.sock:/var/run/docker.sock -u root'
        }
    }
    environment {
        TOKEN = credentials('develobot-token')
        IMAGE = "amanomg8/develobot:latest"
        NAME  = "develobot"
    }
    stages {
        stage('build') {
            steps {
                sh 'docker build -t $IMAGE --no-cache .'
            }
        } // build
        
        stage('deploy') {
            steps {
                // conditionally deploy
                sh "docker container stop $NAME || true"
                sh "docker container rm $NAME || true"
                sh "docker run -d \
                                -v /mnt/bigga/develobot/:/data/ \
                                --name $NAME \
                                -e TOKEN -e BUILD_NUMBER \
                                -e GIT_COMMIT --restart=always --net=host \
                                $IMAGE"
            }
        }
    } // stages
}
