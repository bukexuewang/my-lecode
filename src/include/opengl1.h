#pragma once
#include <glad/glad.h>
#include <GLFW/glfw3.h>


// ������ɫ������
// @return ��������ɫ������ID, 0��ʾʧ��
GLuint createProgram(const char* vertexShaderSource, const char* fragmentShaderSource);

// �󶨶�������
// @param VAO �����������
// @param VBO ���㻺�����
void bindVertices(float vertices[], GLsizeiptr size, GLuint* VAO, GLuint* VBO);
