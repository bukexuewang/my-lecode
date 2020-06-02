#pragma once

#ifndef MESH_H
#define MESH_H

#include <vector>

#include <glm\ext\vector_float3.hpp>
#include <glm\ext\vector_float2.hpp>

#include "../texture/texture.h"
#include "../shader/shader.h"

struct Vertex {
    glm::vec3 position;
    glm::vec3 normal;
    glm::vec2 texCoords;
};

class Mesh {
public:
    /*  ��������  */
    vector<unsigned int> indices;
    vector<Texture*> textures;
    vector<Vertex> vertices;

    Mesh(vector<Vertex> vertices, vector<Texture*> textures, vector<unsigned int> indices);
    ~Mesh();

    void paint(Shader* shader);

private:
    /*  ��Ⱦ����  */
    unsigned int VAO, VBO, EBO; // ����������󡢶��㻺����������������

    void setupMesh();
};

#endif