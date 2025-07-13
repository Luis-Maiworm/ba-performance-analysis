workspace "Bachelor, Luis Maiworm: RESTful-Web-Framework Performance-Analysis Architecture" {

    !identifiers hierarchical

    model {

        system = softwareSystem "Plant Monitoring Platform" {
            architecture = container "Docker Compose Setup" "Docker Network" {

                comp_express = component "Express" ""
                comp_fastapi = component "FastAPI" ""
                comp_grafana = component "Grafana" ""
                comp_prom = component "Prometheus" ""
                comp_k6 = component "K6" ""
                
                sqlite_1 = component "sqlite 1" "FastAPI Database"{
                    tags "Database"
                }
                sqlite_2 = component "sqlite 2" "Express.js Database"{
                    tags "Database"
                }
                
                comp_fastapi -> sqlite_1 "uses"
                comp_express -> sqlite_2 "uses"
                

                comp_prom -> comp_express "pull /metrics Endpoint"
                comp_prom -> comp_fastapi "pull /metrics Endpoint"
                
                comp_k6 -> comp_express "sends requests"
                comp_k6 -> comp_fastapi "sends requests"
                
                comp_k6 -> comp_prom "push k6_metrics"   
                
                comp_prom -> comp_grafana "redirects metrics"
               
            }

            
            
        }
    }

    views {
        component system.architecture "PerformanceAnalysisArchitectureDiagram" {
            include *

            title "Softwarearchitekture: Framework-Performance-Analyse"

        }

        styles {            
            element "Element" {
                color white
            }
            element "Component" {
                shape box
                background #6da7de
            }
            element "Container"{
                background #1168bd

            }
            element "Database" {
                shape cylinder
            }
            element "External System" {
                background #999999
            }
        }
    }

    configuration {
        scope softwareSystem
    }
}